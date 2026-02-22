import Container from "./Container";
import PrimaryButton from "./PrimaryButton";

export default function NavBar() {
  return (
    <header className="border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="/" className="font-semibold tracking-tight text-gray-900">
            Khula NPC
          </a>

          <nav className="flex items-center gap-2">
            <PrimaryButton href="/register">Register</PrimaryButton>
            <PrimaryButton href="/sponsor">Sponsor</PrimaryButton>
          </nav>
        </div>
      </Container>
    </header>
  );
}