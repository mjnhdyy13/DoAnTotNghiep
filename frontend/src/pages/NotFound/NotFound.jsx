import { Alert, AlertTitle, Button } from '@mui/material'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Error Missing Url</AlertTitle>
            You’re either misspelling the URL — <strong>check it out!</strong>
            <br />
            <Link to={'/'}>
                <Button sx={{ color: 'orange' }}>Back to Home</Button>
            </Link>
        </Alert>

    )
}

export default NotFound