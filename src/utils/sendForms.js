module.exports = {
  sendForm1: function(clientData) {
    fetch('https://c-fajardo.com/api/nicapp/sendreport', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        repsName: clientData.repsName,
        repsEmail: clientData.repsEmail,
        repsComment: '... a comment will go here =)',
        clientFirstName: clientData.firstName,
        clientLastName: clientData.lastName,
        clientMedicaid: clientData.medicaid,
        clientPhone: clientData.phone,
        clientMedicare: clientData.medicare,
        clientHomecare: clientData.homecare,
        clientTransportation: clientData.transportation,
      }),
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  },
};
