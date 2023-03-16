// Подключение GSAP
gsap.registerPlugin(Flip)
// Массив с данными для вывода в карточки пользователя
let dataUsers = [
    {
        avatar: './img/user0.webp',
        fio: 'Семенова Анна Львовна',
        prof: 'Frontend-разработчик',
        job: '"Яндекс"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user1.webp',
        fio: 'Прохоров Демид Андреевич',
        prof: 'Backend-разработчик',
        job: '"Северсталь-IT"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user2.webp',
        fio: 'Белоусова Марьям Артёмовна',
        prof: 'Старший менеджер',
        job: '"МТС-логистик"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user3.webp',
        fio: 'Максимов Ян Никитич',
        prof: 'Фрилансер',
        job: '"Самозанятый и Ко"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user4.webp',
        fio: 'Шарова Эвелина Алексеевна',
        prof: 'HR-специалист',
        job: '"AddU-Bit"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user5.webp',
        fio: 'Григорьев Глеб Макарович',
        prof: 'Нейрохирург',
        job: '"Мед & GO"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    },
    {
        avatar: './img/user6.webp',
        fio: 'Филиппов Константин Маркович',
        prof: 'Брокер',
        job: '"Binanceful"',
        chunk1: './img/chunk1.png',
        chunk2: './img/chunk2.png',
        chunk3: './img/chunk3.png'
    }
]
// Функция отрисовки карточки пользователя
function render() {
    let data = [...dataUsers]

    for (let user of data) {
        let $flipItem = document.createElement('li'),
            $flipAvatar = document.createElement('img'),
            $flipDescription = document.createElement('div'),
            $flipFio = document.createElement('h2'),
            $flipProf = document.createElement('h3'),
            $flipJob = document.createElement('h3'),
            $flipAdditional = document.createElement('div'),
            $flipChunk1 = document.createElement('img'),
            $flipChunk2 = document.createElement('img'),
            $flipChunk3 = document.createElement('img')

        $flipItem.classList.add('flip__item')
        $flipAvatar.classList.add('flip__avatar')
        $flipDescription.classList.add('flip__description')
        $flipFio.classList.add('flip__line', 'flip__fio')
        $flipProf.classList.add('flip__line', 'flip__prof')
        $flipJob.classList.add('flip__line', 'flip__job')
        $flipAdditional.classList.add('flip__additional')
        $flipChunk1.classList.add('flip__chunk', 'flip__chunk-1')
        $flipChunk2.classList.add('flip__chunk', 'flip__chunk-2')
        $flipChunk3.classList.add('flip__chunk', 'flip__chunk-3')

        $flipAvatar.src = user.avatar
        $flipFio.textContent = user.fio
        $flipProf.textContent = user.prof
        $flipJob.textContent = user.job
        $flipChunk1.src = user.chunk1
        $flipChunk2.src = user.chunk2
        $flipChunk3.src = user.chunk3

        $flipAdditional.append($flipChunk1, $flipChunk2, $flipChunk3)
        $flipDescription.append($flipFio, $flipProf, $flipJob)
        $flipItem.append($flipAvatar, $flipDescription, $flipAdditional)
        document.getElementById('flip__list').append($flipItem)
    }
}
render()
// Установка flip-анимации на карточки
const dur = 0.5
let lastItems = [],
    lastIndex = -1

const listItems = gsap.utils.toArray('.flip__item')
listItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    const itemTargets = gsap.utils.toArray(item.querySelectorAll('*')),
          isSameAsLast = i === lastIndex && listItems[lastIndex],
          targets = isSameAsLast 
                    ? listItems.concat(itemTargets) 
                    : listItems.concat(itemTargets.concat(lastItems))
    const state = Flip.getState(targets)
    
    if (!isSameAsLast && listItems[lastIndex]) listItems[lastIndex].classList.remove('expanded')

    listItems[i].classList.toggle('expanded')
    
    Flip.from(state, {
      duration: dur,
      ease: "power1.inOut",
      absolute: true,
      nested: true,
      onEnter: elements => gsap.fromTo(elements, 
        {
            opacity: 0
        }, 
        {
            opacity: 1, 
            duration: dur / 2, 
            delay: dur / 2
        }),
      onLeave: elements => gsap.fromTo(elements, 
        {
            opacity: (i, el) => state.getProperty(el, "opacity")
        }, 
        {
            opacity: 0, 
            duration: dur / 2
        }),
    })
    
    lastItems = itemTargets
    lastIndex = i
  })
})