# React COmposition Patterns Overview

## 1. Children
Pass JSX as children and the component decides where to render it.

```jsx
<Card>
  <p>Hello</p>
</Card>


function Card({ children }) {
  return <div className="card">{children}</div>;
}
```


## 2. Slots (Named Composition)
Pass content into explicit slots.

```jsx
<Card
  header={<Header />}
  footer={<Footer />}
/>

function Card({ header, footer, children }) {
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
```

### 3. Compound Components
Multiple components work together via shared state (usually Context).

```jsx
import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);

  const value = {
    on,
    toggle: () => setOn(o => !o),
  };

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
}

function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>{on ? "ON" : "OFF"}</button>;
}

function ToggleStatus() {
  const { on } = useContext(ToggleContext);
  return <p>{on ? "Enabled" : "Disabled"}</p>;
}

Toggle.Button = ToggleButton;
Toggle.Status = ToggleStatus;
 ```

 ```jsx
 <Toggle>
  <Toggle.Button />
  <Toggle.Status />
</Toggle>
 ```

## 4. Render Props (Children as a Function)

Pass a function that receives state.

```jsx
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children({ on, toggle: () => setOn(o => !o) });
}
```

```jsx
<Toggle>
  {({ on }) => <span>{on}</span>}
</Toggle>
```

## 5. Function-as-Prop
Like render props, but scoped.

```jsx
function List({ items, renderItem }) {
  return items.map(renderItem);
  }
```

```jsx
<List renderItem={item => <Item item={item} />} />

```

## 6. Polymorphic Components (as)

Component controls styles, consumer controls element.

```jsx
function Text({ as: Comp = "span", children }) {
  return <Comp>{children}</Comp>;
}
```

```jsx
<Text as="h1">Title</Text>
```

## 7. asChild / Slot Cloning
Pass a child and the component adopts it.

```jsx

<Button asChild>
  <a href="/home" />
</Button>
```

```jsx
function Button({ asChild, children }) {
  if (!asChild) return <button>{children}</button>;
  return cloneElement(children, { className: "btn" });
}
```