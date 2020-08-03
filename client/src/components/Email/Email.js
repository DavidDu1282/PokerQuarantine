import React from 'react';
import { Email, Item, A} from 'react-html-email';
export default function InlineLink({name}) {
  return (
  <Email title = 'Invitation to PokerQuarantine'>
    <Item>
       Hello {name}
       <A style={{ paddingLeft: 10 }}  href='https://poker-quarantine.herokuapp.com/'>Click me!</A>
    </Item>
  </Email>
)};
