interface Props {
    children: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    onClick: () => void;
}

function Button({ children, color = 'primary', onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className={"btn btn-" + color}>{children}</button>
    )

}
export default Button;


