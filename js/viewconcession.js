'use strict'

const demo =  [
    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

    {
      
        accountno: 2305643012,
        branch: 'Surulere Branch',
        month: 'April2022',
        totaldeposit:105000,
        servicecharge:30000,
        commission:1000,
        id: 1,
    },

   
]

const generateTemplate = () => {
    const arrayOfGenerateTemplate = demo.map((item, index) => {
      return `
      <tr>
      <td></td>
      <td>${item.accountno}</td>
      <td>${item.branch}</td>
      <td>${item.month}</td>
      <td>${item.totaldeposit}</td>
      <td>${item.servicecharge}</td>
      <td>${item.commission}</td>
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