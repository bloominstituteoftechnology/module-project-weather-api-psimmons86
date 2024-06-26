async function sprintChallenge5() {
  // Wrap the footer update in a try-catch block
  try {
    const footer = document.querySelector('footer')
    if (footer) {
      footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`
    }
  } catch (error) {
    console.error('Footer not found:', error)
  }

  const infoElement = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  async function fetchData(url) {
    try {
      const response = await axios.get(url)
      console.log(`Data fetched from ${url}:`, response.data)
      return response.data
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error)
      throw error
    }
  }

  try {
    infoElement.textContent = 'Loading data...'
    
    // Simulate API response for testing purposes
    const mockLearners = [
      { id: 1, fullName: 'Bob Johnson', email: 'bob@example.com', mentors: [1, 2] },
      // Add more mock learners as needed
    ]
    const mockMentors = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' },
      // Add more mock mentors as needed
    ]

    // Use mock data instead of actual API calls
    const learners = mockLearners
    const mentors = mockMentors

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
  } catch (error) {
    console.error('Error in sprintChallenge5:', error)
    infoElement.textContent = 'An error occurred while fetching data'
    const errorDiv = document.createElement('div')
    errorDiv.textContent = `Error details: ${error.message}`
    document.body.appendChild(errorDiv)
  }
}

// Do not change this code
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
