'use strict';

export const createbranch = ()=>{

const inputbranch = document.querySelector('.createbranch')
const addbranchbtn = document.querySelector('.createbranchbtn')
const branchescontainer = document.querySelector('.branchescontainer')

let branchesarr = []



// let demoarr = [ 'math','tola','sheyi','funmi','tolgdfa','shdseyi','funasxdmi','tokmlla','shfdegyi','fudgnmi','tofdgla','shegfdyi','fugnmi','togla','shgfeyi','fudgnmi','tofgdfla','sgheyi','fudfgnmi']

// demoarr.forEach(value=>{
//     // console.log(value);
//     document.c
// })

const deletefunct =(datta)=>{
    branchesarr = branchesarr.filter(data=>data!==datta)
        display();
}

const display =()=>{
    branchescontainer.innerHTML = `
    ${branchesarr.map((data, index)=>{
        return(`
        <div style='margin: 3px;' id=${index} class="branch">
                    <p class="branchname">${data}</p>
                    <div class="cancelbranch"><i onclick='deletefunct("${data}")' class="fa-solid fa-xmark"></i></div>
                </div>
        `)
    }).join('')}
    `
}
// `bkhsdhfds ds d ${}`
window.addEventListener('load', display(),false);

// window.onmousedown=(e)=>{
//     let el = e.target;
//     if(el.tagName.toLowerCase() == 'i' && el.parentNode.classList.contains('cancelbranch') && el.parentNode.parentNode.classList.contains('branch')){
//         console.log('id', el.parentNode.parentNode.id, 'content',el.parentNode.parentNode.children[0].textContent)
//         demoarr = demoarr.filter(data=>data!==el.parentNode.parentNode.children[0].textContent)
//         display();
//     }
// }

addbranchbtn.addEventListener('click', function(e){
    e.preventDefault()
    if(!inputbranch.value)return
    branchesarr.push(inputbranch.value)
    console.log(inputbranch.value);
    // console.log(branchesarr);
    display()
    inputbranch.value= ''
})

}