import { ContactWrap, ContactItem, ContactColect } from './ContactList.style';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ContactWrap>
      <ContactColect>
        {contacts.map(({ id, name, number }) => (
          <ContactItem key={id}>
            {name}: <span>{number}</span>
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </ContactItem>
        ))}
      </ContactColect>
    </ContactWrap>
  );
};
