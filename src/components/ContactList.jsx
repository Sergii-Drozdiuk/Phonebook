import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { selectVisibleContacts } from '../redux/contacts/selectors';
import { delContact } from '../redux/contacts/operations';
import { fetchContacts } from '../redux/contacts/operations';
import { setSelectedContact, setIsEdit } from '../redux/contacts/editSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const sortedContacts = [...visibleContacts].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContact = (id, name) => {
    const isConfirmed = window.confirm('Delete contact?');
    if (isConfirmed) {
      toast.success(`${name} has been successfully deleted from your contacts.`);
      dispatch(delContact(id)).then(() => {
        dispatch(fetchContacts());
      });
    }
  };

  const handleEdit = id => {
    const editedContact = sortedContacts.find(contact => contact.id === id);
    dispatch(setSelectedContact(editedContact));
    dispatch(setIsEdit(true));
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Demo>
        <List className='overflow-y-auto scrollbar-none sm:max-h-[70vh]'>
          {sortedContacts.length ? (
            sortedContacts.map(({ id, name, number }) => (
              <ListItem
                key={id}
                sx={{ paddingTop: '0px', paddingBottom: '0px' }}
                secondaryAction={
                  <>
                    <IconButton edge='end' aria-label='edit' onClick={() => handleEdit(id)}>
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      sx={{ marginLeft: '8px' }}
                      onClick={() => deleteContact(id, name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
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
