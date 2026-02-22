import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200">
      <Container>
        <div className="flex flex-col gap-3 py-6 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Khula NPC. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="underline" href="/terms">Terms & Conditions</a>
            <a className="underline" href="/indemnity">Indemnity</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}