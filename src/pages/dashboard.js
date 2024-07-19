import LayoutAdmin from "../layouts/LayoutAdmin";
import { checkAuthAdmin } from '../utils/adminAuth';

export async function getServerSideProps(context) {
    return checkAuthAdmin(context);
}

export default function Dashboard() {
    return (
        <LayoutAdmin>
            <h1>Dashboard</h1>
        </LayoutAdmin>
    );
}