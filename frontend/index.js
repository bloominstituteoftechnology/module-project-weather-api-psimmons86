async function sprintChallenge5() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  const infoElement = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  // Utility function to create and append an element
  function createElement(type, parent, textContent = '', className = '') {
    const element = document.createElement(type)
    element.textContent = textContent
    if (className) element.className = className
    parent.appendChild(element)
    return element
  }

  try {
    // Fetch learners data
    const learnersRes = await axios.get('http://localhost:3003/api/learners')
    const mentorsRes = await axios.get('http://localhost:3003/api/mentors')
    const learners = learnersRes.data
    const mentors = mentorsRes.data

    // Create learner cards
    learners.forEach(learner => {
      const card = createElement('div', cardsContainer, '', 'card')
      createElement('h3', card, learner.fullName)
      createElement('div', card, learner.email)
      createElement('h4', card, 'Mentors')
      const ul = createElement('ul', card)
      ul.style.display = 'none'  // Initially hide mentors
      learner.mentors.forEach(mentorId => {
        const mentor = mentors.find(m => m.id === mentorId)
        if (mentor) {
          createElement('li', ul, mentor.firstName + ' ' + mentor.lastName)
        }
      })

      // Add click event listener to card
      card.addEventListener('click', () => {
        const wasSelected = card.classList.contains('selected')
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'))
        if (!wasSelected) {
          card.classList.add('selected')
          infoElement.textContent = `The selected learner is ${learner.fullName}`
        } else {
          infoElement.textContent = 'No learner is selected'
        }
      })
    })

    infoElement.textContent = 'No learner is selected'
  } catch (error) {
    console.error('Error fetching data:', error)
    infoElement.textContent = 'An error occurred while fetching data'
  }
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
