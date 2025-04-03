const { Headers } = require("node-fetch");
const gadm = require('@google-ads/admanager').v1

const credentials = {
  client_email: process.env.GOOGLE_ADS_MANAGER_EMAIL,
  private_key: process.env.GOOGLE_ADS_MANAGER_PRIVATE_KEY,
}

const reportClient = new gadm.ReportServiceClient({credentials})

const networkPrefix = `networks/${process.env.GOOGLE_ADS_MANAGER_NETWORK_CODE}`


reportClient.createReport({
  parent: networkPrefix,
  report: {
    name: "TEST CREATE REPORT",
    reportDefinition: {
      dimensions: ["DATE", "AD_UNIT_ID"],
      metrics: ["ADSENSE_AVERAGE_ECPM"],
    }
  }
}).then(x => console.log(x))
