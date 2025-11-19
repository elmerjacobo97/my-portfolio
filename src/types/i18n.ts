// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns1 from "@/locales/en.json";
import ns2 from "@/locales/es.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof ns1;
      es: typeof ns2;
    };
  }
}