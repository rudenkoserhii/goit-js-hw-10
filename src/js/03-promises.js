import Notiflix from 'notiflix';

function createPromise(position, delay) {
        return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            } else {
                reject({ position, delay })
            }
        }, delay);
    });
};

const refs = {
    delay: document.querySelector('[name="delay"]'),
    step: document.querySelector('[name="step"]'),
    amount: document.querySelector('[name="amount"]'),
    form: document.querySelector('.form'),
    btn: document.querySelector('btn'),
};

function onSubmitForm(event) {
    event.preventDefault();
    let delay = Number(refs.delay.value);
        
    for (let position = 1; position <= refs.amount.value; position ++) {
    
        createPromise(position, delay)
        .then(({ position, delay }) => {Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);})
        .catch(({ position, delay }) => {Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);});

        delay += Number(refs.step.value);
    };

    refs.form.reset();
};

refs.form.addEventListener('submit', onSubmitForm);


// import Notiflix from 'notiflix';

// function createPromise(position, delay) {
//         return new Promise((resolve, reject) => {
//         const shouldResolve = Math.random() > 0.3;
//         setTimeout(() => {
//             if (shouldResolve) {
//                 resolve({ position, delay })
//             } else {
//                 reject({ position, delay })
//             }
//         }, delay);
//     });
// };

// const refs = {
//     delay: document.querySelector('[name="delay"]'),
//     step: document.querySelector('[name="step"]'),
//     amount: document.querySelector('[name="amount"]'),
//     form: document.querySelector('.form'),
//     btn: document.querySelector('btn'),
// };

// function onSubmitForm(event) {
//     event.preventDefault();
        
//     let promisesMass = [];
    
//     for (let i = 1; i <= refs.amount.value; i++) {
//         const promiseObject = { position: i, delay: Number(refs.delay.value) + Number(refs.step.value * i) };
//         promisesMass.push(promiseObject);
//     };
    
//     const promises = promisesMass.map(({ position, delay }) => { createPromise(position, delay) });
    
//     Promise.all(promises)
//     .then(({ position, delay }) => {Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);})
//     .catch(({ position, delay }) => {Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);});

//     refs.form.reset();
// };

// refs.form.addEventListener('submit', onSubmitForm);




