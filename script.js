document.addEventListener('DOMContentLoaded', () => {

   let reslove, reject;

   /** This function will run when showing any popups
    *  This will return Promise that we can reslove or reject Promise lator
    * */
   const AlertShow = (message, cls) => {
       let div = document.querySelector(cls),
       para = document.querySelector(`${cls} p`);

       div.style.display = 'flex'
       para.innerHTML = message

       setTimeout(() => {
         div.classList.add('show')
       }, 100)

       return new Promise((res, rej) => {
          reslove = res,
          reject = rej
       })   
    }

   /** This function will run when hiding any popups
    *  This will reslove or reject Promise
    * */
   const closeAlert = (cls, type = true) => {
      let div = document.querySelector(cls)
       div.classList.remove('show')

       setTimeout(() => {
         div.style.display = 'none'
       }, 100)

       reslove(type)
   }

   // showing alerts popups
   const showAlert = str => AlertShow(str, '.alert');
   document.querySelector('.alert .close').addEventListener('click', () => closeAlert('.alert'))
   document.querySelector('.alert button').addEventListener('click', () => closeAlert('.alert'))


   // showing confirm popups
   const showConfirm = str => AlertShow(str, '.confirm');
   document.querySelector('.confirm .confirm-btn').addEventListener('click', () => closeAlert('.confirm'))
   document.querySelector('.confirm .cancel-btn').addEventListener('click', () => closeAlert('.confirm', false))


   // showing prompt popups
   const showPrompt = str => AlertShow(str, '.prompt');
   document.querySelector('.prompt .close').addEventListener('click', () => closeAlert('.prompt', null))
   document.querySelector('.prompt button').addEventListener('click', () => {
       let input = document.querySelector('.prompt input');
       closeAlert('.prompt', input.value)
       input.value = '';
   })


   document.querySelector('.alert-btn').addEventListener('click', async () => {
        // browser simple alert
        // alert('I m a simple alert')
        await showAlert('I m custom styled alert')
        console.log('after alert')
   })

   document.querySelector('.confirm-alert-btn').addEventListener('click', async () => {
        // simple confirm popup
        // let wait = confirm('Do you want to exit from the page ?')
        let wait = await showConfirm('Do you want to exit from the page ?')
        console.log(wait)
   })

   document.querySelector('.prompt-alert-btn').addEventListener('click', async () => {
        // ssimple prompt popup
        // let wait = prompt('How are you ?')
        let wait = await showPrompt('How are you ?')
        console.log(wait)
   })
})
