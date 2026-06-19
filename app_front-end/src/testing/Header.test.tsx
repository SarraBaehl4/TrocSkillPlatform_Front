import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { Header } from "../components/commons/Header";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../context/AuthContext";


const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});


function renderHeader() {
  const fakeAuth: AuthContextType = {
    user: null,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn().mockResolvedValue(undefined),
  };

  render(
    <MemoryRouter>
      <AuthContext.Provider value={fakeAuth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return fakeAuth;
}

describe("Header", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("affiche le titre", () => {
    renderHeader();
    expect(screen.getByText("TROCSKILL-HUB")).toBeInTheDocument();
  });

  it("le menu est fermé par défaut", () => {
    renderHeader();
    const menu = document.querySelector(".nav-menu");
    expect(menu).not.toHaveClass("active");
  });

  it("ouvre le menu au clic sur le bouton toggle", () => {
    renderHeader();
    const toggleButton = screen.getByLabelText("Menu");

    fireEvent.click(toggleButton);

    const menu = document.querySelector(".nav-menu");
    expect(menu).toHaveClass("active");
  });

  it("ferme le menu si on clique deux fois sur le bouton toggle", () => {
    renderHeader();
    const toggleButton = screen.getByLabelText("Menu");

    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    const menu = document.querySelector(".nav-menu");
    expect(menu).not.toHaveClass("active");
  });

  it("appelle logout() et redirige vers /login au clic sur Déconnexion", async () => {
    const fakeAuth = renderHeader();

    fireEvent.click(screen.getByText("Déconnexion"));

    expect(fakeAuth.logout).toHaveBeenCalledOnce();
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/login"));
  });
});