const demo =  [
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },
    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    {
        particulars: "ALAIFY 2UGWUAGBA OBOSI MKT.G",
        accountuser: 'OSUALAIFY',
        actgroup:'G',
        bank: 'Access Bank',
        bankactno:'00079636335',
        withdrawal: 237000
    },

    
]

const generateTemplate = () => {
    const arrayOfGenerateTemplate = demo.map((item, index) => {
      return `
      <tr>
      <td></td>
      <td>${item.particulars}</td>
      <td>${item.accountuser}</td>
      <td>${item.actgroup}</td>
      <td>${item.bank}</td>
      <td>${item.bankactno}</td>
      <td>${item.withdrawal}</td>
  </tr>
          `;
    });
    const stringPopulateTemplate = arrayOfGenerateTemplate.join("");
  
    return stringPopulateTemplate;
  };


  const display = () => {
    const table =document.getElementById('table')
    const head = table.innerHTML
    table.innerHTML = head + generateTemplate();
}

window.addEventListener('load',display)