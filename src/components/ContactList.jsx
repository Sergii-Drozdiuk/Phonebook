import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectVisibleContacts } from '../redux/contacts/selectors';
import { delContact } from '../redux/contacts/operations';
import { fetchContacts } from '../redux/contacts/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContact = (id, name) => {
    toast.success(`${name} has been successfully deleted from your contacts`);
    dispatch(delContact(id)).then(() => {
      dispatch(fetchContacts());
    });
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Demo>
        <List className='sm:max-h-[70vh] overflow-y-auto scrollbar-none'>
          {visibleContacts.length ? (
            visibleContacts.map(({ id, name, number }) => (
              <ListItem
                key={id}
                sx={{ paddingTop: '0px', paddingBottom: '0px' }}
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => deleteContact(id, name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={number}
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
              </ListItem>
            ))
          ) : (
            <p className='text-center'>Contacts not found</p>
          )}
        </List>
      </Demo>
    </Box>
  );
};
