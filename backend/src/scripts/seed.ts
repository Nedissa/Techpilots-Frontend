import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              };
            }
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);

    return new WorkflowResponse(stores);
  }
);

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "eur",
          is_default: true,
        },
        {
          currency_code: "usd",
        },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "European Warehouse",
          address: {
            city: "Copenhagen",
            country_code: "DK",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "European Warehouse delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          {
            country_code: "gb",
            type: "country",
          },
          {
            country_code: "de",
            type: "country",
          },
          {
            country_code: "dk",
            type: "country",
          },
          {
            country_code: "se",
            type: "country",
          },
          {
            country_code: "fr",
            type: "country",
          },
          {
            country_code: "es",
            type: "country",
          },
          {
            country_code: "it",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id"],
    filters: {
      type: "publishable",
    },
  });

  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const {
      result: [publishableApiKeyResult],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });

    publishableApiKey = publishableApiKeyResult as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Laptops",
          is_active: true,
        },
        {
          name: "Desktops",
          is_active: true,
        },
        {
          name: "Components",
          is_active: true,
        },
        {
          name: "Gaming",
          is_active: true,
        },
        {
          name: "Phones",
          is_active: true,
        },
        {
          name: "TV & HiFi",
          is_active: true,
        },
        {
          name: "Network",
          is_active: true,
        },
      ],
    },
  });

  logger.info("Seeding product attributes...");

  const productModuleService = container.resolve(Modules.PRODUCT);

  // Laptops attributes
  await productModuleService.createAttributes([
    { key: "laptop_processor", title: "Processor" },
    { key: "laptop_ram_gb", title: "RAM (GB)" },
    { key: "laptop_ram_type", title: "RAM Type" },
    { key: "laptop_storage_gb", title: "Storage (GB)" },
    { key: "laptop_storage_type", title: "Storage Type" },
    { key: "laptop_screen_size_inches", title: "Screen Size (inches)" },
    { key: "laptop_screen_resolution", title: "Screen Resolution" },
    { key: "laptop_screen_refresh_rate_hz", title: "Screen Refresh Rate (Hz)" },
    { key: "laptop_gpu", title: "GPU" },
    { key: "laptop_gpu_vram_gb", title: "GPU VRAM (GB)" },
    { key: "laptop_battery_life_hours", title: "Battery Life (hours)" },
    { key: "laptop_weight_kg", title: "Weight (kg)" },
    { key: "laptop_os", title: "Operating System" },
    { key: "laptop_warranty_months", title: "Warranty (months)" },
    { key: "laptop_sku", title: "SKU" },
    { key: "laptop_ean", title: "EAN" },
  ]);

  // Desktops attributes
  await productModuleService.createAttributes([
    { key: "desktop_processor", title: "Processor" },
    { key: "desktop_ram_gb", title: "RAM (GB)" },
    { key: "desktop_ram_type", title: "RAM Type" },
    { key: "desktop_storage_gb", title: "Storage (GB)" },
    { key: "desktop_storage_type", title: "Storage Type" },
    { key: "desktop_gpu", title: "GPU" },
    { key: "desktop_gpu_vram_gb", title: "GPU VRAM (GB)" },
    { key: "desktop_motherboard", title: "Motherboard" },
    { key: "desktop_power_supply_w", title: "Power Supply (W)" },
    { key: "desktop_case_size", title: "Case Size" },
    { key: "desktop_os", title: "Operating System" },
    { key: "desktop_warranty_months", title: "Warranty (months)" },
    { key: "desktop_sku", title: "SKU" },
    { key: "desktop_ean", title: "EAN" },
  ]);

  // CPU Component attributes
  await productModuleService.createAttributes([
    { key: "cpu_cores", title: "Cores" },
    { key: "cpu_threads", title: "Threads" },
    { key: "cpu_socket", title: "Socket" },
    { key: "cpu_tdp_w", title: "TDP (W)" },
  ]);

  // GPU Component attributes
  await productModuleService.createAttributes([
    { key: "gpu_memory_gb", title: "Memory (GB)" },
    { key: "gpu_memory_type", title: "Memory Type" },
    { key: "gpu_memory_bandwidth", title: "Memory Bandwidth" },
    { key: "gpu_power_consumption_w", title: "Power Consumption (W)" },
  ]);

  // RAM Component attributes
  await productModuleService.createAttributes([
    { key: "ram_type", title: "Type" },
    { key: "ram_speed_mhz", title: "Speed (MHz)" },
    { key: "ram_latency_cas", title: "Latency (CAS)" },
    { key: "ram_capacity_gb", title: "Capacity (GB)" },
  ]);

  // Storage Component attributes
  await productModuleService.createAttributes([
    { key: "storage_interface", title: "Interface" },
    { key: "storage_capacity_gb", title: "Capacity (GB)" },
    { key: "storage_rpm_for_hdd", title: "RPM (for HDD)" },
  ]);

  // Motherboard Component attributes
  await productModuleService.createAttributes([
    { key: "motherboard_chipset", title: "Chipset" },
    { key: "motherboard_socket", title: "Socket" },
    { key: "motherboard_memory_slots", title: "Memory Slots" },
    { key: "motherboard_form_factor", title: "Form Factor" },
  ]);

  // PSU Component attributes
  await productModuleService.createAttributes([
    { key: "psu_wattage", title: "Wattage (W)" },
    { key: "psu_efficiency_rating", title: "Efficiency Rating" },
    { key: "psu_modular_type", title: "Modular Type" },
  ]);

  // Gaming attributes (Laptops/Desktops)
  await productModuleService.createAttributes([
    { key: "gaming_gpu", title: "GPU" },
    { key: "gaming_gpu_tier", title: "GPU Tier" },
    { key: "gaming_processor", title: "Processor" },
    { key: "gaming_ram_gb", title: "RAM (GB)" },
    { key: "gaming_screen_refresh_rate_hz", title: "Screen Refresh Rate (Hz)" },
    { key: "gaming_response_time_ms", title: "Response Time (ms)" },
    { key: "gaming_warranty_months", title: "Warranty (months)" },
  ]);

  // Phones attributes
  await productModuleService.createAttributes([
    { key: "phone_screen_size_inches", title: "Screen Size (inches)" },
    { key: "phone_screen_type", title: "Screen Type" },
    { key: "phone_soc_model", title: "SoC Model" },
    { key: "phone_camera_mp_main", title: "Main Camera (MP)" },
    { key: "phone_camera_mp_front", title: "Front Camera (MP)" },
    { key: "phone_battery_mah", title: "Battery (mAh)" },
    { key: "phone_os_version", title: "OS Version" },
    { key: "phone_5g_support", title: "5G Support" },
    { key: "phone_water_resistance_rating", title: "Water Resistance Rating" },
  ]);

  // TV attributes
  await productModuleService.createAttributes([
    { key: "tv_panel_type", title: "Panel Type" },
    { key: "tv_screen_size_inches", title: "Screen Size (inches)" },
    { key: "tv_brightness_nits", title: "Brightness (nits)" },
    { key: "tv_contrast_ratio", title: "Contrast Ratio" },
    { key: "tv_smart_tv_support", title: "Smart TV Support" },
    { key: "tv_refresh_rate_hz", title: "Refresh Rate (Hz)" },
  ]);

  // Audio/HiFi attributes
  await productModuleService.createAttributes([
    { key: "audio_driver_size_mm", title: "Driver Size (mm)" },
    { key: "audio_frequency_range", title: "Frequency Range" },
    { key: "audio_impedance_ohms", title: "Impedance (Ohms)" },
    { key: "audio_sensitivity_db", title: "Sensitivity (dB)" },
  ]);

  // Network Access Point attributes
  await productModuleService.createAttributes([
    { key: "network_wifi_standard", title: "WiFi Standard" },
    { key: "network_speed_mbps", title: "Speed (Mbps)" },
    { key: "network_coverage_area_sqm", title: "Coverage Area (sqm)" },
    { key: "network_ports_count", title: "Ports Count" },
    { key: "network_frequency_bands", title: "Frequency Bands" },
    { key: "network_security_standards", title: "Security Standards" },
  ]);

  logger.info("Finished seeding product attributes.");

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Example Laptop",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Laptops")!.id,
          ],
          description: "High-performance laptop with latest specifications",
          handle: "example-laptop",
          weight: 1800,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          variants: [
            {
              title: "Standard",
              sku: "LAPTOP-001",
              prices: [
                {
                  amount: 99900,
                  currency_code: "sek",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Example Desktop",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Desktops")!.id,
          ],
          description: "Powerful desktop workstation",
          handle: "example-desktop",
          weight: 5000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          variants: [
            {
              title: "Standard",
              sku: "DESKTOP-001",
              prices: [
                {
                  amount: 129900,
                  currency_code: "sek",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Example Phone",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Phones")!.id,
          ],
          description: "Advanced smartphone with cutting-edge features",
          handle: "example-phone",
          weight: 200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          variants: [
            {
              title: "Standard",
              sku: "PHONE-001",
              prices: [
                {
                  amount: 12990,
                  currency_code: "sek",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  logger.info("Finished seeding inventory levels data.");
}
