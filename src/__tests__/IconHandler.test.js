import { render, screen } from '@testing-library/react';

import IconHandler from '../components/IconHandler'
import { faKitchenSet, faPersonHiking, faBiking, faCode, faMusic } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


describe("Icon Handler", () => {
    it("should return false", () => {
        expect(Number('1')).toEqual(1)
    });

    const icons = [faPersonHiking, faBiking, faCode, faKitchenSet, faMusic];
    // const [selectedIndex, setSelectedIndex] = useState(5);
    let selectedIndex = 5;
    const fnMock = jest.fn();
    const setSelectedIndex = new fnMock();

    it("should return 5 elements", () => {
        render(<IconHandler icons={icons} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>);
        console.log("SCREEN", screen);
        // expect(screen.getByText('Learn React')).toBeInTheDocument();
    });
});