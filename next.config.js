module.exports = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.API_ADRESS,
        sendMailAdress: process.env.SEND_MAIL_ADRESS,
        API_KEY: process.env.API_KEY
      },
}