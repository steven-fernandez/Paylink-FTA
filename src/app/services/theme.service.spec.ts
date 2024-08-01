import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let addClassSpy: jest.SpyInstance;
  let removeClassSpy: jest.SpyInstance;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
    localStorage.clear();

    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    addClassSpy = jest.spyOn(DOMTokenList.prototype, 'add');
    removeClassSpy = jest.spyOn(DOMTokenList.prototype, 'remove');

    service = new ThemeService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should enable dark mode and update localStorage and document body class', () => {
    service.enableDarkMode();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(addClassSpy).toHaveBeenCalledWith('dark');
  });

  it('should enable light mode and update localStorage and document body class', () => {
    service.enableLightMode();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(removeClassSpy).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme from light to dark', () => {
    service.enableLightMode(); // Ensure starting from light
    service.toggleTheme();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(addClassSpy).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.enableDarkMode(); // Ensure starting from dark
    service.toggleTheme();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(removeClassSpy).toHaveBeenCalledWith('dark');
  });

  it('should load initial theme based on localStorage', () => {
    getItemSpy.mockReturnValue('dark'); // Mock localStorage returning 'dark'
    service.loadInitialTheme();
    expect(addClassSpy).toHaveBeenCalledWith('dark');
  });
});
