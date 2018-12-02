export class MenuItem {
  name: string;
  link: string;
  icon: string;
  position: string;
  selected: boolean;
  visible = true;
  action: () => void;
  menuItems: MenuItem[];
}
