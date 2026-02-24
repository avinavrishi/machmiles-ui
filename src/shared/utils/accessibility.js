import { Platform } from 'react-native';

export const accessibility = {
  createAccessibleComponent: (Component) => {
    return ({ accessibilityLabel, accessibilityHint, accessibilityRole, ...props }) => {
      if (Platform.OS === 'web') {
        return (
          <Component
            aria-label={accessibilityLabel}
            aria-describedby={accessibilityHint}
            role={accessibilityRole}
            {...props}
          />
        );
      }

      return (
        <Component
          accessible
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityRole={accessibilityRole}
          {...props}
        />
      );
    };
  },

  createAccessibleButton: (Component) => {
    return accessibility.createAccessibleComponent(({ onPress, ...props }) => (
      <Component
        onPress={onPress}
        accessibilityRole="button"
        {...props}
      />
    ));
  },

  createAccessibleLink: (Component) => {
    return accessibility.createAccessibleComponent(({ href, ...props }) => (
      <Component
        href={href}
        accessibilityRole="link"
        {...props}
      />
    ));
  },

  createAccessibleImage: (Component) => {
    return accessibility.createAccessibleComponent(({ source, alt, ...props }) => (
      <Component
        source={source}
        accessibilityRole="image"
        accessibilityLabel={alt}
        {...props}
      />
    ));
  },

  createAccessibleInput: (Component) => {
    return accessibility.createAccessibleComponent(({ value, onChange, ...props }) => (
      <Component
        value={value}
        onChange={onChange}
        accessibilityRole="textbox"
        {...props}
      />
    ));
  },

  createAccessibleList: (Component) => {
    return accessibility.createAccessibleComponent(({ items, ...props }) => (
      <Component
        items={items}
        accessibilityRole="list"
        {...props}
      />
    ));
  },

  createAccessibleListItem: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="listitem"
        {...props}
      />
    ));
  },

  createAccessibleHeading: (Component) => {
    return accessibility.createAccessibleComponent(({ level = 1, ...props }) => (
      <Component
        accessibilityRole={`heading${level}`}
        {...props}
      />
    ));
  },

  createAccessibleText: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="text"
        {...props}
      />
    ));
  },

  createAccessibleGroup: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="group"
        {...props}
      />
    ));
  },

  createAccessibleRegion: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="region"
        {...props}
      />
    ));
  },

  createAccessibleLandmark: (Component) => {
    return accessibility.createAccessibleComponent(({ landmark, ...props }) => (
      <Component
        accessibilityRole={landmark}
        {...props}
      />
    ));
  },

  createAccessibleDialog: (Component) => {
    return accessibility.createAccessibleComponent(({ isOpen, onClose, ...props }) => (
      <Component
        isOpen={isOpen}
        onClose={onClose}
        accessibilityRole="dialog"
        accessibilityModal={true}
        {...props}
      />
    ));
  },

  createAccessibleAlert: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="alert"
        {...props}
      />
    ));
  },

  createAccessibleStatus: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="status"
        {...props}
      />
    ));
  },

  createAccessibleTimer: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="timer"
        {...props}
      />
    ));
  },

  createAccessibleProgressBar: (Component) => {
    return accessibility.createAccessibleComponent(({ value, max, ...props }) => (
      <Component
        value={value}
        max={max}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max,
          now: value,
        }}
        {...props}
      />
    ));
  },

  createAccessibleSlider: (Component) => {
    return accessibility.createAccessibleComponent(({ value, min, max, onChange, ...props }) => (
      <Component
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        accessibilityRole="slider"
        accessibilityValue={{
          min,
          max,
          now: value,
        }}
        {...props}
      />
    ));
  },

  createAccessibleSwitch: (Component) => {
    return accessibility.createAccessibleComponent(({ value, onChange, ...props }) => (
      <Component
        value={value}
        onChange={onChange}
        accessibilityRole="switch"
        accessibilityValue={{
          text: value ? 'on' : 'off',
        }}
        {...props}
      />
    ));
  },

  createAccessibleCheckbox: (Component) => {
    return accessibility.createAccessibleComponent(({ checked, onChange, ...props }) => (
      <Component
        checked={checked}
        onChange={onChange}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked,
        }}
        {...props}
      />
    ));
  },

  createAccessibleRadio: (Component) => {
    return accessibility.createAccessibleComponent(({ checked, onChange, ...props }) => (
      <Component
        checked={checked}
        onChange={onChange}
        accessibilityRole="radio"
        accessibilityState={{
          checked,
        }}
        {...props}
      />
    ));
  },

  createAccessibleTab: (Component) => {
    return accessibility.createAccessibleComponent(({ selected, ...props }) => (
      <Component
        selected={selected}
        accessibilityRole="tab"
        accessibilityState={{
          selected,
        }}
        {...props}
      />
    ));
  },

  createAccessibleTabList: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="tablist"
        {...props}
      />
    ));
  },

  createAccessibleTabPanel: (Component) => {
    return accessibility.createAccessibleComponent(({ ...props }) => (
      <Component
        accessibilityRole="tabpanel"
        {...props}
      />
    ));
  },
};

export const useAccessibility = () => {
  const [announcement, setAnnouncement] = useState('');

  const announce = useCallback((message) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 1000);
  }, []);

  return {
    announce,
    announcement,
  };
};

export const AccessibilityProvider = ({ children }) => {
  const { announcement } = useAccessibility();

  if (Platform.OS === 'web') {
    return (
      <>
        {children}
        {announcement && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            {announcement}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {children}
      {announcement && (
        <AccessibilityInfo
          announcement={announcement}
        />
      )}
    </>
  );
}; 