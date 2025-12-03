// const navleftsection = document.getElementById('nav-left-section');
const navopen = document.getElementById('navopen');
const navul = document.getElementById('navul');
const navclose = document.getElementById('navclose');
const navleftitems = document.getElementById('navleftitems');
const spinner = document.getElementById('spinner');
const navnotificationbtn = document.getElementById('navnotificationbtn');
const navsearchbtn = document.getElementById('nav-searchbtn');
const navleftcontainer = document.getElementById('nav-left-container');
const navsearchcontainer = document.getElementById('nav-search-container');
const navcontainer = document.getElementById('navcontainer');
const navnoticeholder = document.getElementById('navnoticeholder');
const navuserbtn = document.getElementById('navuserbtn');
const navuserdropdown = document.getElementById('navuserdropdown');
const navuserholder = document.getElementById('navuserholder');
const navmarker = document.getElementById('navmarker');
const navbranchselect = document.getElementById('navbranchselect');
const navbranchselectbtn = document.getElementById('navbranchselectbtn');
const imgselectbranch = document.getElementById('imgselectbranch');
const navsearchselect = document.getElementById('navsearchselect');
const navsearchselectbtn = document.getElementById('navsearchselectbtn');
const imgselectsearch = document.getElementById('imgselectsearch');
const navsearchinputvalue = document.getElementById('navsearchinputvalue');
const navsearchmainbtn = document.getElementById('navsearchmainbtn');
const navesearchresultscreen = document.getElementById('navesearchresultscreen');
const navregisteruser = document.getElementById('navregisteruser');
const mainscreen = document.getElementById('nav-right-section');
const hidescreen = document.getElementById('nav-right-section2');
const navrightcontainer = document.getElementById('nav-right-container');
const navrightcontainer2 = document.getElementById('nav-right-container2');
const navrightcontainer3 = document.getElementById('nav-right-container3'); 
const ulid = document.getElementById('ul-id');
const shid = document.getElementById('sh-id');
let locations = ['Lagos', 'Head office', 'Port Harcourt', 'Delta'];
let searchitems = ['PROPERTY', 'LOANS', 'SAVINGS']
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time)); 
  } 
   
if (document.getElementById('sessionrole').value != 'SUPERADMIN') {
  const els = document.getElementsByClassName('superadminonly'); // live
  for (let i = els.length - 1; i >= 0; i--) els[i].remove();
}


 /////////////////////////////////////////////////////////////////////////////

if(ulid){
    ulid.innerHTML = locations.map(data =>{
    return (`<li role="option" class="navbranchlist" >${data}</li>`)
  }).join('')
}
if(shid){
    shid.innerHTML = searchitems.map(data =>{
    return (`<li role="option" class="navsearchlist" >${data}</li>`)
  }).join('');
}
  
  
  const creatspin =(cont)=>{
      let spin = document.createElement('div');
      spin.setAttribute('id','spinner')
      spin.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
      //console.log(spin);
      if(spin){
      document.getElementById(cont).append(spin)
      }
  }
if(navmarker){
  navmarker.addEventListener('click', e=>{
    // navmarker.classList.toggle('open');
    // setTimeout(() => {
    //     if(navmarker.classList.contains('open')){
    //         document.documentElement.style.setProperty('--speed', '1s');
    //         document.documentElement.style.setProperty('--blueheader', '18, 40, 184');
    //         document.documentElement.style.setProperty('--bluenav', '18, 29, 41');
    //         // document.documentElement.style.setProperty('--black', '91, 91, 92');
    //         document.documentElement.style.setProperty('--black', '255, 255, 255');
    //         document.documentElement.style.setProperty('--white', '196, 197, 204');
    //         document.documentElement.style.setProperty('--whiteb', '19, 19, 20');
    //         document.documentElement.style.setProperty('--activeb', '0, 0, 0');
    //         setTimeout(() => {
    //             document.documentElement.style.setProperty('--speed', '.2s');
    //         }, 1300);
    //     }else{
    //         document.documentElement.style.setProperty('--speed', '1s');
    //         document.documentElement.style.setProperty('--blueheader', '0, 123, 255');
    //         document.documentElement.style.setProperty('--bluenav', '18, 154, 199');
    //         document.documentElement.style.setProperty('--black', '0, 0, 0');
    //         document.documentElement.style.setProperty('--white', '255, 255, 255');
    //         document.documentElement.style.setProperty('--whiteb', '255, 255, 255');
    //         document.documentElement.style.setProperty('--activeb', '');
    //         setTimeout(() => {
    //             document.documentElement.style.setProperty('--speed', '.2s');
    //         }, 1300);
    //     }
    // }, 50);
    // if(navrightcontainer.classList.contains('z2')){
    //     creatspin('nav-right-container')
    // }
    // if(navrightcontainer3.classList.contains('z2')){
    //     creatspin('nav-right-container3')
    // }
    if(spinner.classList.contains('hidden')){
        spinner.classList.remove('hidden')
    }else{
        spinner.classList.add('hidden')
    }
    
  })
}

// TO OPEN AND CLOSE IN NAVIGATION
if(navopen){
    navopen.addEventListener('click', e=>{
    navopen.style.width = '0%';
    navopen.style.height = '0%';
    navclose.style.width = '0%';
    navclose.style.height = '0%';
    setTimeout(()=>{
        setTimeout(() => {
            navopen.style.width = '55%';
            navopen.style.height = '55%';
            navclose.style.width = '55%';
            navclose.style.height = '55%';
        }, 100);
        navopen.classList.add('hidden');
        navclose.classList.remove('hidden');
    }, 100);
    navleftcontainer.style.width = '220px';
    setTimeout(() => {
        navmarker.style.display = 'flex';
        setTimeout(() => {
            navmarker.style.width = '220px';
            navmarker.style.right = '0%';
        }, 200)
    }, 200);
    

});
}
if(navclose){
    navclose.addEventListener('click', e=>{
    navclose.style.width = '0%';
    navclose.style.height = '0%';
    navopen.style.width = '0%';
    navopen.style.height = '0%';
    setTimeout(()=>{
        setTimeout(() => {
            navclose.style.width = '55%';
            navclose.style.height = '55%';
            navopen.style.width = '55%';
            navopen.style.height = '55%';
        }, 100);
        navclose.classList.add('hidden');
        navopen.classList.remove('hidden');
    }, 100);
    navleftcontainer.style.width = '0px';
    navmarker.style.display = 'none';
    navmarker.style.right = '200%';
});
}

const navserachfunction =()=>{
        navsearchbtn.classList.toggle('open');
        setTimeout(() => {
            if(navsearchbtn.classList.contains('open')){
                navsearchbtn.classList.add('navclicked');
                navsearchcontainer.style.width = '320px';
                setTimeout(()=>{
                    document.getElementById("navul").style.left = '0px';
                },100);
            }else{
                navsearchbtn.classList.remove('navclicked');
                setTimeout(() => {
                    navsearchcontainer.style.width = '0px';
                    setTimeout(()=>{
                        document.getElementById("navul").style.left = '2000%'
                    },1000);
                }, 500);
            }
        }, 50);
}

if(navsearchbtn){
navsearchbtn.addEventListener('click', e=>{
    if(navnotificationbtn.classList.contains('open'))navnotificationfunction();
    if(navuserbtn.classList.contains('open'))navuserfunction();
    navserachfunction();
});
}

if(navul){
    navul.addEventListener('click', e=>{
    navsearchbtn.classList.remove('open');
    navsearchbtn.classList.remove('navclicked');
    setTimeout(() => {
        navsearchcontainer.style.width = '0px';
        setTimeout(()=>{
            document.getElementById("navul").style.left = '2000%'
        },1000);
    }, 500);
});
}

const navnotificationfunction =()=>{
        navnotificationbtn.classList.toggle('open');
        setTimeout(() => {
            if(navnotificationbtn.classList.contains('open')){
                navnotificationbtn.classList.add('navclicked');
                navnoticeholder.classList.remove('hidden');
                // navnoticeholder.classList.add('opennavnotificationn');
                const doSomething = async () => {
                    for (let i = 0; i < navnoticeholder.children.length; i++) {
                      await sleep(50);
                      navnoticeholder.style.height = `${100 + (30 * i)}px`
                      navnoticeholder.children[i].style.right = '0%';
                    }
                }
                doSomething();
            }else{
                navnotificationbtn.classList.remove('navclicked');
                // navnoticeholder.classList.add('opennavnotificationn');
                const doSomethingclose = async () => {
                    //console.log(navnoticeholder.children.length);
                    for (let i = navnoticeholder.children.length-1; i >= 0; i--) {
                        await sleep(20);
                        navnoticeholder.style.height = `${parseInt(navnoticeholder.style.height) - 30}px`;
                            navnoticeholder.children[i].style.right = '120%';
                            if(i === 0){
                                navnoticeholder.style.height ='0px'
                            setTimeout(() => {
                                navnoticeholder.classList.add('hidden');
                            }, 200);
                            }
                    }
                
                  }
                doSomethingclose();
            }
        }, 50);
}

if(navnotificationbtn){
    navnotificationbtn.addEventListener('click', e=>{
    if(navsearchbtn.classList.contains('open'))navserachfunction();
    if(navuserbtn.classList.contains('open'))navuserfunction()
    navnotificationfunction();
});
}

if(navuserdropdown)navuserdropdown.addEventListener('click', e=>{
    navuserbtn.click();
});

if(navuserbtn)navuserbtn.addEventListener('click', e=>{
    if(navsearchbtn.classList.contains('open'))navserachfunction();
    if(navnotificationbtn.classList.contains('open'))navnotificationfunction();
        navuserfunction();
});

const navuserfunction =()=>{
    navuserbtn.classList.toggle('open');
    setTimeout(() => {
        if(navuserbtn.classList.contains('open')){
            navuserdropdown.classList.add('navclickeduser');
            navuserbtn.classList.add('navclickeduser');
            navuserholder.classList.remove('hidden');
            // navuserholder.classList.add('opennavnotificationn');
            const doSomething = async () => {
                for (let i = 0; i < navuserholder.children.length; i++) {
                  await sleep(50);
                  navuserholder.style.height = `${60 + (30 * i)}px`
                  navuserholder.children[i].style.right = '0%';
                  navuserholder.children[i].children[1].style.left = '0%'; 
                }
            }
            doSomething();
        }else{
            navuserbtn.classList.remove('navclickeduser');
            navuserdropdown.classList.remove('navclickeduser');
            // navuserholder.classList.add('opennavnotificationn');
            const doSomethingclose = async () => {
                //console.log(navuserholder.children.length);
                for (let i = navuserholder.children.length-1; i >= 0; i--) {
                    await sleep(20);
                    navuserholder.style.height = `${parseInt(navuserholder.style.height) - 30}px`;
                        navuserholder.children[i].style.right = '120%'; 
                        navuserholder.children[i].children[1].style.left = '320%'; 
                        if(i === 0){
                            navuserholder.style.height ='0px'
                        setTimeout(() => {
                            navuserholder.classList.add('hidden');
                        }, 200);
                        }
                }
            
              }
            doSomethingclose();
        }
    }, 50);
}

// document.getElementById('md-select').addEventListener('click', e=>{
//       document.getElementById('md-select').classList.toggle('active');
//       navbranchselectbtn.classList.toggle('activeb')
// })

if(navbranchselectbtn)navbranchselectbtn.addEventListener('click', e=>{
    if(document.getElementById('md-select').classList.contains('active')){
        document.getElementById('md-select').classList.remove('active');
        navbranchselectbtn.classList.remove('activeb');
        setTimeout(() => {
            imgselectbranch.classList.remove('hidden');
            // navbranchselectbtn.style.zIndex = '1'
        }, 500);
    }else{
        document.getElementById('md-select').classList.add('active');
        navbranchselectbtn.classList.add('activeb')
        imgselectbranch.classList.add('hidden')
    }
    
  })
if(navsearchselectbtn)navsearchselectbtn.addEventListener('click', e=>{
    if(document.getElementById('sh-select').classList.contains('active')){
        document.getElementById('sh-select').classList.remove('active');
        navsearchselectbtn.classList.remove('activeb');
        setTimeout(() => {
            imgselectsearch.classList.remove('hidden');
        }, 500);
    }else{
        document.getElementById('sh-select').classList.add('active');
        navsearchselectbtn.classList.add('activeb')
        imgselectsearch.classList.add('hidden')
    }
    console.log('valu', navsearchselect.value)
    
  })

//   document.querySelector('#md-select ul li').addEventListener('click', e=>{
//     var v = document.querySelector('.md-select ul li').textContent;
//     console.log(v)
//   })

  navbranchselectbtn.textContent = navbranchselect.value;
  navsearchselectbtn.textContent = navsearchselect.value;

  if(navsearchinputvalue)navsearchinputvalue.addEventListener('keyup', e=>{
    //console.log()
    if(navsearchinputvalue.value.length > 2)navsearchmainbtn.style.left = '0%';
    if(navsearchinputvalue.value.length <= 2)navsearchmainbtn.style.left = '100%';
  })
  
  let prevopennav = '';
  
  const ainavhandle =(id)=>{
      if(!prevopennav){
          navfunct(id);
          prevopennav = id;
          return
      }
      if(prevopennav){
          if(prevopennav === id){
            navfunct(id);
            prevopennav = '';
            return
          }
          if(prevopennav !== id){
              navfunct(prevopennav);
              navfunct(id);
              prevopennav = id;
          }
      }
  }

  const navfunct =(id)=>{
    //console.log(id);
    document.getElementById(id).classList.toggle('open')
    if(document.getElementById(id).classList.contains('open')){
        document.getElementById(id).children[0].children[0].style.transform = 'rotate(450deg)';
        document.getElementById(id).children[0].style.left = '10%';
        document.getElementById(id).children[0].style.transform = 'scale(1.12)';
        // document.getElementById(id).children[0].style.fontWeight = 'scale(1.09)';
        setTimeout(() => {
        }, 2100);
        const donavSomething = async () => {
            for (let i = 0; i < document.getElementsByName(id).length; i++) {
                            //   await sleep(10);
                              document.getElementsByName(id)[i].style.display = 'flex';
                              document.getElementsByName(id)[i].style.height = '0px';
                              await sleep(50);
                              document.getElementsByName(id)[i].style.height = '35px';
                              document.getElementsByName(id)[i].style.right = '-15%';
                              setTimeout(() => {
                                  document.getElementsByName(id)[i].style.right = '0%';
                                },350)
                            }
                        }
                        donavSomething();
                        return
                    }else{
            document.getElementById(id).children[0].children[0].style.transform = 'rotate(0deg)';
            document.getElementById(id).children[0].style.left = '0%';
            document.getElementById(id).children[0].style.transform = 'scale(1)';
                        const donavSomethingclose = async () => {
            //console.log(navuserholder.children.length);
                            for (let i = document.getElementsByName(id).length-1; i >= 0; i--) {
                                await sleep(50);
                              document.getElementsByName(id)[i].style.right = '-15%';
                              setTimeout(() => {
                                  document.getElementsByName(id)[i].style.right = '100%';
                                   setTimeout(() => {
                                    document.getElementsByName(id)[i].style.display = 'none';
                                    // document.getElementsByName(id)[i].style.bottom = '100%';
                                    }, 100);
                              },250)
                               
                                }
                            }
                        
                            donavSomethingclose();
                          
                        return
                    }
    }


const switchScreen =(condition)=>{
    let currentscreen = '';
    let newscreen = '';
    if(navrightcontainer.classList.contains('z2')){
        currentscreen = navrightcontainer;
        newscreen = navrightcontainer3;
    }
    if(navrightcontainer3.classList.contains('z2')){
        newscreen = navrightcontainer;
        currentscreen = navrightcontainer3;
    }
   
if(condition === 'diffnewlanding'){
     document.documentElement.style.setProperty('--speed', '.4s');
        currentscreen.style.right = '0%';
        newscreen.style.left = '100%';
        currentscreen.style.transform = 'scale(0.7)';
        newscreen.style.transform = 'scale(0.7)';
        setTimeout(() => {
            currentscreen.style.right = '100%';
            newscreen.style.left = '0%';
            setTimeout(() => {
                currentscreen.style.transform = 'scale(1)';
                newscreen.style.transform = 'scale(1)';
                setTimeout(() => {
                    document.documentElement.style.setProperty('--speed', '.2s');
                    currentscreen.classList.remove('z2')
                    newscreen.classList.add('z2')
                    setTimeout(() => {
                        currentscreen.innerHTML = ''
                        currentscreen.style.right = '';
                        currentscreen.style.left = '';
                        newscreen.style.right = '';
                        newscreen.style.left = '';
                    }, 50);
                }, 500);
            }, 300);
        }, 50);
}
if(condition === 'samechildlanding'){
    document.documentElement.style.setProperty('--speed', '0s');
    newscreen.style.transform = 'scale(0.7)';
    newscreen.style.opacity = '0.3';
    setTimeout(() => {
        document.documentElement.style.setProperty('--speed', '.3s');
        currentscreen.style.right = '0%'
        setTimeout(() => {
            currentscreen.style.right = '100%';
            setTimeout(() => {
                newscreen.style.transform = 'scale(1)';
                newscreen.style.opacity = '';
                setTimeout(() => {
                    document.documentElement.style.setProperty('--speed', '.2s');
                    currentscreen.classList.remove('z2')
                    newscreen.classList.add('z2')
                    setTimeout(() => {
                        currentscreen.innerHTML = '';
                        currentscreen.style.right = '';
                        currentscreen.style.left = '';
                        newscreen.style.right = '';
                        newscreen.style.left = '';
                    }, 50);
                }, 500);
            }, 300);
        }, 50);
    }, 100);
    
}
if(condition === 'samechildreturning'){
    document.documentElement.style.setProperty('--speed', '0s');
    newscreen.style.right = '100%'
    newscreen.style.opacity = '0.3';
    currentscreen.classList.remove('z2')
    newscreen.classList.add('z2')
    setTimeout(() => {
        document.documentElement.style.setProperty('--speed', '.3s');
        currentscreen.style.transform = 'scale(0.7)';
        setTimeout(() => {
            newscreen.style.right = '0%';
            newscreen.style.opacity = '';
            setTimeout(() => {
                currentscreen.style.transform = 'scale(1)';
                setTimeout(() => {
                    document.documentElement.style.setProperty('--speed', '.2s');
                    setTimeout(() => {
                        currentscreen.innerHTML = '';
                        currentscreen.style.right = '';
                        currentscreen.style.left = '';
                        newscreen.style.right = '';
                        newscreen.style.left = '';
                    }, 50);
                }, 500);
            }, 300);
        }, 50);
    }, 100);
    
}
   
    
}

const callDialog =(action, content, timer, funct, params)=>{
    let dialogContainer = document.getElementById('dialogContainer')
    let dialogmodal = document.getElementById('dialogmodal')
    if(action == 'OPEN'){
        dialogContainer.style.top = '0%'
    }else if(action == 'CLOSE'){
        dialogContainer.style.top = '-300%'
    }else{
        dialogContainer.style.top = '-300%'
    }
    if(content){
        dialogmodal.innerHTML = content
    }
    if(timer){
        setTimeout(()=>{
            callDialog()
        },timer)
    }
    if(funct){
        if(params)return funct(params);
        return funct();
    }else{
        return;
    }
    
}


const callModal =( mssg, status = 2, time = 5000, id)=> {
  const notificationmodal = document.getElementById('notificationmodal');
  var mbox = document.getElementById('messageBox2');
  if(id && document.getElementById(id)){
            document.getElementById(id).style.borderColor = 'red';
            mbox.innerHTML = mssg;
            notificationmodal.style.right = '0%';
            notificationmodal.style.opacity = '1';
            setTimeout(function(){
                notificationmodal.style.right = '-120%';
                notificationmodal.style.opacity = '0';
            }, time);	
            setTimeout(function(){
                document.getElementById(id).style.borderColor = 'rgb(62, 63, 64,.5)';
            }, 3000)
        };
  if(status == '0'){
            //   document.getElementById(id).style.borderColor = 'red';
               notificationmodal.style.backgroundColor = 'white';
              mbox.style.color = 'red';
          mbox.innerHTML = mssg;
          notificationmodal.style.right = '0%';
          notificationmodal.style.opacity = '1';
              notificationmodal.style.borderColor = 'red'
          setTimeout(function(){ 
              notificationmodal.style.right = '-120%';
              notificationmodal.style.opacity = '0';
          }, time);
      }else if(status == '1'){
            //   document.getElementById(id).style.borderColor = 'red';
            notificationmodal.style.backgroundColor = 'white';
              mbox.style.color = '#2a422c';
              notificationmodal.style.borderColor = 'green'
          mbox.innerHTML = mssg;
          notificationmodal.style.right = '0%';
          notificationmodal.style.opacity = '1';
          setTimeout(function(){
              notificationmodal.style.right = '-120%';
              notificationmodal.style.opacity = '0';
          }, time);
      }else{
            notificationmodal.style.backgroundColor = 'white';
              mbox.style.color = 'black';
              notificationmodal.style.borderColor = 'white'
          mbox.innerHTML = mssg;
          notificationmodal.style.right = '0%';
          notificationmodal.style.opacity = '1';
          setTimeout(function(){
              notificationmodal.style.right = '-120%';
              notificationmodal.style.opacity = '0';
          }, time);
          
      }
          mbox.innerHTML = mssg;
          notificationmodal.style.right = '0%';
          notificationmodal.style.opacity = '1';
          setTimeout(function(){
              notificationmodal.style.right = '-120%';
              notificationmodal.style.opacity = '0';
          }, time);
      
  };



// navrightcontainer.innerHTML = `<p class="firstloadermsg blink_me">LOADING...</p>`




