async function sprintChallenge5() {
  // ... (previous code)

  const infoElement = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  try {
    infoElement.textContent = 'Loading data...'
    const [learnersRes, mentorsRes] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors')
    ])
    const learners = learnersRes.data
    const mentors = mentorsRes.data

    // Clear any existing cards
    cardsContainer.innerHTML = ''

    // Create learner cards
    learners.forEach(learner => {
      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `
        <h3>${learner.fullName}</h3>
        <div>${learner.email}</div>
        <h4>Mentors</h4>
        <ul style="display: none;">
          ${learner.mentors.map(mentorId => {
            const mentor = mentors.find(m => m.id === mentorId)
            return mentor ? `<li>${mentor.firstName} ${mentor.lastName}</li>` : ''
          }).join('')}
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
    console.error('Error fetching data:', error)
    infoElement.textContent = 'An error occurred while fetching data'
  }
}

// ... (rest of the code)
