import { Text } from "../Typography";
import { LogoIcon } from "../icons/logo";

export function Footer() {
  return (
    <footer className="max-w-7xl px-4 py-8 m-auto mt-3 flex flex-col sm:flex-row justify-between items-end">
      <a className="h-10 mb-2 sm:mb-0" href="/">
        <LogoIcon />
      </a>

      <div className="order-first sm:order-last">
        <Text>Todos os direitos reservados ©</Text>
      </div>
    </footer>
  );
}
