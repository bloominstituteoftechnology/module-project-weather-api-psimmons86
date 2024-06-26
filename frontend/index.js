async function sprintChallenge5() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  const infoElement = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  async function fetchData(url) {
    const response = await axios.get(url)
    return response.data
  }

  try {
    infoElement.textContent = 'Loading data...'
    
    const [learners, mentors] = await Promise.all([
      fetchData('http://localhost:3003/api/learners'),
      fetchData('http://localhost:3003/api/mentors')
    ])

    console.log('Learners:', learners) // Debugging
    console.log('Mentors:', mentors) // Debugging

    if (!learners.length) {
      throw new Error('No learners data received')
    }

    // Clear any existing cards
    cardsContainer.innerHTML = ''

    // Create learner cards
    learners.forEach(learner => {
      const card = document.createElement('div')
      card.className = 'card'
      
      const mentorsList = learner.mentors
        .map(mentorId => {
          const mentor = mentors.find(m => m.id === mentorId)
          return mentor ? `<li>${mentor.firstName} ${mentor.lastName}</li>` : ''
        })
        .join('')

      card.innerHTML = `
        <h3>${learner.fullName}</h3>
        <div>${learner.email}</div>
        <h4 class="closed">Mentors</h4>
        <ul style="display: none;">
          ${mentorsList}
        </ul>
      `
      cardsContainer.appendChild(card)

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
    console.error('Error:', error) // Debugging
    infoElement.textContent = 'An error occurred while fetching data'
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
