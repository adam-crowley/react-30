import express from 'express'
const router = express.Router()

// /user-authentication/register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    // Store this in MongoDB for future reference
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /user-authentication/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    // Check if this matches what's in MongoDB
  } catch (error) {
    console.error('Error fetching quotes:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
