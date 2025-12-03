'use strict'
export const registereditemview =()=>{
const repeatrow = document.querySelector('.repeatrow')
const demo =  [
    {
      title: "50kg bag of rice",
      model: '250 GALLON',
      Wprice: 55000.00,
      Sprice: 5500.00,
      Mprice:0.00,
      id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
    
     {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },

    {
        title: "50kg bag of rice",
        model: '250 GALLON',
        Wprice: 55000.00,
        Sprice: 5500.00,
        Mprice:0.00,
        id: 1,
    },
]

const generateTemplate = () => {
    const arrayOfGenerateTemplate = demo.map((item, index) => {
      return `
      <tr>
      <td>${index+1}</td>
      <td>${item.title}</td>
      <td>${item.model}</td>
      <td>#${item.Wprice}</td>
      <td>#${item.Sprice}</td>
      <td>#${item.Mprice}</td>
  </tr>
          `;
    });
    const stringPopulateTemplate = arrayOfGenerateTemplate.join("");
  
    return stringPopulateTemplate;
  };


  const display = () => {
    const table =document.getElementById('registereditemviewtable')
    const head = table.innerHTML
    table.innerHTML = head + generateTemplate();
}



// window.addEventListener('load', function(){
  display()
// })
}
