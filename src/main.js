const { v1: gadm, protos} = require('@google-ads/admanager')

const credentials = {
  client_email: process.env.GOOGLE_ADS_MANAGER_EMAIL,
  private_key: process.env.GOOGLE_ADS_MANAGER_PRIVATE_KEY,
}

console.log(credentials)

const reportClient = new gadm.ReportServiceClient({credentials})

const networkPrefix = `networks/${process.env.GOOGLE_ADS_MANAGER_NETWORK_CODE}`

const { google } = protos;

reportClient.listReports({parent: networkPrefix}).then((response) => {
  response[0].forEach((report) => {
    console.log("Report ID: ", report.reportId)
  })

  reportClient.createReport({
    parent: networkPrefix,
    report: google.ads.admanager.v1.Report.fromObject({
      name: "TEST CREATE REPORT",
      reportDefinition: {
        dimensions: ["DATE", "AD_UNIT_ID"],
        metrics: ["ADSENSE_AVERAGE_ECPM"],
      }
    })
  }).then((x) => console.log(x))

})

