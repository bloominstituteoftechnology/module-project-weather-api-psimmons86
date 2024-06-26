async function sprintChallenge5() {
  const footer = document.querySelector('footer')
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  const infoElement = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  async function fetchData(url) {
    try {
      const response = await axios.get(url)
      console.log(`Data fetched from ${url}:`, response.data) // Debugging
      return response.data
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error)
      throw error
    }
  }

  try {
    infoElement.textContent = 'Loading data...'
    
    const [learners, mentors] = await Promise.all([
      fetchData('http://localhost:3003/api/learners'),
      fetchData('http://localhost:3003/api/mentors')
    ])

    if (!Array.isArray(learners) || learners.length === 0) {
      throw new Error('No learners data received or data is not an array')
    }

    cardsContainer.innerHTML = ''

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
    console.log('Cards rendered successfully') // Debugging
  } catch (error) {
    console.error('Error in sprintChallenge5:', error)
    infoElement.textContent = 'An error occurred while fetching data'
    // Add more detailed error information to the DOM for debugging
    const errorDiv = document.createElement('div')
    errorDiv.textContent = `Error details: ${error.message}`
    document.body.appendChild(errorDiv)
  }
}

// Immediately invoke the function to run it
sprintChallenge5()

// Do not change this code
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
