import AntDesign from '@expo/vector-icons/AntDesign';

export const icons: Record<
  string,
  (props: Record<string, any>) => JSX.Element
> = {
  index: (props) => <AntDesign name="home" {...props} />,
  profile: (props) => <AntDesign name="profile" {...props} />,
  settings: (props) => <AntDesign name="setting" {...props} />,
};
