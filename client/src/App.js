import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tickets from './components/tickets/Tickets';
import Register from './components/profile/Register';
import Login from './components/profile/Login';
import Notification from './components/Notification';
import Footer from './components/Footer';
import UserAuth from './components/profile/UserAuth';
import ProfilePage from './components/profile/ProfilePage'
import { LoginProvider } from './context/LoginContext';
import { UserProvider } from './context/UserContext';
import { ErrorProvider } from './context/ErrorContext';
import { SelectedTicketProvider } from './context/selectedTicketContext';
import { TicketListProvider } from './context/TicketListContext';
import MainContent from './components/MainContent';
import ContentDetails from './components/ContentDetails';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { TicketCounterProvider } from './context/TicketCounterContext';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <UserProvider>
          <ErrorProvider>
            <TicketCounterProvider>
              <TicketListProvider>
                <SelectedTicketProvider>
                  <UserAuth />
                  <Navbar />
                  <Notification />
                  <Main>
                    <MainContent>
                      <Routes>
                        <Route path="/">
                          <Route index element={<Tickets />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/profile" element={<ProfilePage />} />
                        </Route>
                      </Routes>
                    </MainContent>
                    <ContentDetails />
                  </Main>
                  <Footer />
                </SelectedTicketProvider>
              </TicketListProvider>
            </TicketCounterProvider>
          </ErrorProvider>
        </UserProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}
export default App;