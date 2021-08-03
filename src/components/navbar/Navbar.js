import Container from "@material-ui/core/Container";

function Navbar({ title }) {
  return (
    <header className="navbar">
      <Container maxWidth="lg">
        <h1 className="heading">{title}</h1>
      </Container>
    </header>
  );
}

export default Navbar;
