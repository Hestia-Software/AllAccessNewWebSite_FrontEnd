import Button from './Button/Button';
import CheckBox from './CheckBox/CheckBox';
import DateTime from './dateTime/DateTime';
import InputNumber from './InputNumber/InputNumber';
import Radio from './Radio/RadioButton';
import SelectBox from './SelectBox/SelectBox';
import Spinner from './Spinner/Spiner';
import TextInput from './TextInput/TextInput';
import Typography from './Typography/Typography';
import UploadButton from './UploadButton/UploadButton';
import Modal from './Modal/Modal';
import SideBar from './sideBar/SideBar';
import Loading from './DropDownSpinner/DropDownSpinner';
import HeaderNav from "./layout-components/HeaderNav";
import DynamicTable from "./Table/Table";
import TextArea from "./TextArea/TextArea";
import DynamicForm from './DynamicForm/DynamicForm';
class Component{
    static Button = Button;
    static CheckBox = CheckBox;
    static DateTime = DateTime;
    static InputNumber = InputNumber;
    static Radio = Radio;
    static SelectBox = SelectBox;
    static TextInput = TextInput;
    static TextArea = TextArea;
    static Spinner = Spinner;
    static Typography = Typography;
    static UploadButton = UploadButton;
    static Modal = Modal;
    static SideBar = SideBar;
    static MiniLoader = Loading;
    static DynamicTable = DynamicTable;
    static DynamicForm = DynamicForm;
}
export class UtilsComponent{
    static HeaderNav = HeaderNav;
}
export default Component;