import {
  Avatar,
  Button,
  Box,
  Card,
  CardActions,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { ChangeEventHandler, useState } from 'react';
import {
  Form,
  required,
  TextInput,
  useDataProvider,
  useNotify,
  useRedirect,
} from 'react-admin';
import { useMutation } from 'react-query';

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const { mutate } = useMutation(async () => {
    setLoading(true);
    try {
      await dataProvider.register({ email, name, password });
      notify('Registration successful!', { type: 'info' });
      redirect('/login');
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      notify('Could not register! (see console)', { type: 'error' });
      console.error(error);
    }
  });

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value);
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);
  const handleSubmit = () => mutate();

  return (
    <Form onSubmit={handleSubmit} noValidate>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background:
                    'url(https://source.unsplash.com/featured/1600x900)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Card sx={{ minWidth: 300, marginTop: '6em' }}>
                <Box
                    sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LockIcon />
                    </Avatar>
                </Box>
                <Box
                    sx={{
                        marginTop: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    Register here!
                </Box>
                <Box sx={{ padding: '0 1em 1em 1em' }}>
                    <Box sx={{ marginTop: '1em' }}>
                        <TextInput
                            autoFocus
                            source="email"
                            label="email"
                            onChange={handleEmailChange}
                            disabled={loading}
                            validate={required()}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: '1em' }}>
                        <TextInput
                            autoFocus
                            source="name"
                            label="name"
                            onChange={handleNameChange}
                            disabled={loading}
                            validate={required()}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: '1em' }}>
                        <TextInput
                            source="password"
                            label="password"
                            type="password"
                            onChange={handlePasswordChange}
                            disabled={loading}
                            validate={required()}
                            fullWidth
                        />
                    </Box>
                </Box>
                <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading && (
                            <CircularProgress size={25} thickness={2} />
                        )}
                        Register
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </Form>
);
};
