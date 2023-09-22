import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Forms } from './Phonebook/Form/Form';
import { ContactList } from './Phonebook/Contactlist/ContactList';
import { Filter } from './Phonebook/Filter/Filter';
import Notiflix from 'notiflix';
import { GlobalStyle } from 'components/GlobalStyle';
import { Wrap, Titel } from './App.style';

const initialValues = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],

  filter: '',
};

export class App extends Component {
  state = { ...initialValues };
  componentDidMount = () => {
    const saveCont = localStorage.getItem('contacts');
    if (saveCont !== null) {
      this.setState({
        contacts: JSON.parse(saveCont),
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const isNewContact = prevState.contacts !== this.state.contacts;

    if (isNewContact)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };
  submitContact = (values, { resetForm }) => {
    if (
      this.state.contacts.filter(
        contact =>
          contact.name.toLowerCase().trim() ===
            values.name.toLowerCase().trim() ||
          contact.number.trim() === values.number.trim()
      ).length
    ) {
      return (
        Notiflix.Notify.failure(
          ` Contact ${values.name} was already entered earlier`
        ),
        resetForm()
      );
    } else {
      const newContacts = {
        name: values.name,
        number: values.number,
        id: nanoid(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContacts],
      }));
      resetForm();
    }
  };
  onDeletContacts = id => {
    this.setState(prevStete => ({
      contacts: prevStete.contacts.filter(contacts => contacts.id !== id),
    }));
  };

  filterForm = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizFilter = filter.toLowerCase();
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizFilter)
    );
  };
  render() {
    const filterContacts = this.filterContacts();

    return (
      <Wrap>
        <Titel>Phonebook</Titel>
        <Forms submitContact={this.submitContact} />
        <Titel>Contacts</Titel>
        <Filter filter={this.state.filter} filterForm={this.filterForm} />
        <ContactList
          contacts={filterContacts}
          onDelete={this.onDeletContacts}
        />
        <GlobalStyle />
      </Wrap>
    );
  }
}
