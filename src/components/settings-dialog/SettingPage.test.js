jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

import { render, fireEvent, screen } from '@testing-library/react';
import SettingsPage from './SettingsPage';

test('testing input box', () => {
    const { container } = render(<SettingsPage />);
    let checkInput = container.querySelector("#outlined-basic");
    expect(checkInput).toBeInTheDocument();
    expect(checkInput).toHaveStyle({ width: "100%" });
    const title = screen.getByText("Edit Settings");
    expect(title).toBeInTheDocument();
});

test('allows user input', () => {
    const { container } = render(<SettingsPage />);
    let checkInput = container.querySelector("#outlined-basic");
    fireEvent.change(checkInput, { target: { value: 400 } });
    expect(parseInt(checkInput.value)).toBeGreaterThanOrEqual(200);
    expect(parseInt(checkInput.value)).toBeLessThanOrEqual(1000);
});

test('testing wavelengths combobox', () => {
    const { container } = render(<SettingsPage />);
    let checkWavelengthsComboBox = container.querySelector("#wavelengths");
    expect(checkWavelengthsComboBox).toBeInTheDocument();
    const label2 = screen.getByText("Number of wavelengths:");
    expect(label2).toBeInTheDocument();
});

test('testing wells combobox', () => {
    const { container } = render(<SettingsPage />);
    let checkWellsComboBox = container.querySelector("#wells");
    expect(checkWellsComboBox).toBeInTheDocument();
    const label1 = screen.getByText("Number of wells:");
    expect(label1).toBeInTheDocument();
});
