const config = {
    GOOGLE_API_URL : 'https://www.googleapis.com/auth/analytics.readonly',
    
    //{"installed":{"client_id":"429645920680-2ot79u3trnh1sh42ntl48p87k1l904ds.apps.googleusercontent.com","project_id":"genial-smoke-221214","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"4KpuMZ0i42lENTwreADNmdMx","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
    
    GOOGLE_ADS: {
        developerToken: 'iuBZKKT5lyKBG3D9FGSFpA', //your adwords developerToken
        userAgent: 'node-adwords', //any company name
        clientCustomerId: '669-325-7382', //the Adwords Account id (e.g. 123-123-123)
        client_id: '429645920680-81bhutl7u6p9ha637egeocg4gluutnbc.apps.googleusercontent.com', //this is the api console client_id
        client_secret: 'XmYjtdvss6E3jzc6q0ZZt-rh',
        refresh_token : '1/z20cSbet8LY6_z-gi_R7lBMgM-ja3_6OWZQ0P1lX_kg',
        access_token : 'ya29.GlutBvdUfiWr2BCXyXlpz9BVXj2q8EFTzJm3Q2rSoHaZLCCAdwmfW3j3pWVGnJAwXgBnJsmCVFNm2QS6dGMNCb_ncL3UYS-L_9t-V1Rpb4BmRBg6Q-4dJ9xd9O_r',
    },
    
    FACEBOOK: {
        access_token : 'EAAH5JU8FzXoBADuKJJpRZAZAaS8UxaS6cn4LctpkjBTKtGlhosrq2LZCT7SJ8IzEaJJ2QD7dIo8ZAYY53QtFeokS5F9GpmMZBz9AOv68ZC7ENelnY0xvPuZBiJbk7kG53FTQSwq4o7gXUJAFDblLGz8cDFUCqeUZChmBjiX7bEwiKQWEEZCNepc6E',
        ad_account_id : 'act_567812170346929',
        app_secret : '473c77940c1b25f7a82aea2b90094550',
        app_id : '555413611597178',
    }
}

module.exports = config
