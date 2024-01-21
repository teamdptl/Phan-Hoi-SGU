import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import {
    Card,
    Title,
    Text,
    Flex,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Badge,
    Button, TextInput,
} from "@tremor/react";
import {ArrowDownTrayIcon, ArrowUpTrayIcon} from "@heroicons/react/24/outline/index.js";


const colors = {
    "Ready for dispatch": "gray",
    Cancelled: "rose",
    Shipped: "emerald",
};

const transactions = [
    {
        transactionID: "#123456",
        user: "Lena Mayer",
        item: "Under Armour Shorts",
        status: "Ready for dispatch",
        amount: "$ 49.90",
        link: "#",
    },
    {
        transactionID: "#234567",
        user: "Max Smith",
        item: "Book - Wealth of Nations",
        status: "Ready for dispatch",
        amount: "$ 19.90",
        link: "#",
    },
    {
        transactionID: "#345678",
        user: "Anna Stone",
        item: "Garmin Forerunner 945",
        status: "Cancelled",
        amount: "$ 499.90",
        link: "#",
    },
    {
        transactionID: "#4567890",
        user: "Truls Cumbersome",
        item: "Running Backpack",
        status: "Shipped",
        amount: "$ 89.90",
        link: "#",
    },
    {
        transactionID: "#5678901",
        user: "Peter Pikser",
        item: "Rolex Submariner Replica",
        status: "Cancelled",
        amount: "$ 299.90",
        link: "#",
    },
    {
        transactionID: "#6789012",
        user: "Phlipp Forest",
        item: "On Clouds Shoes",
        status: "Ready for dispatch",
        amount: "$ 290.90",
        link: "#",
    },
    {
        transactionID: "#78901234",
        user: "Mara Pacemaker",
        item: "Ortovox Backpack 40l",
        status: "Shipped",
        amount: "$ 150.00",
        link: "#",
    },
    {
        transactionID: "#89012345",
        user: "Sev Major",
        item: "Oakley Jawbreaker",
        status: "Ready for dispatch",
        amount: "$ 190.90",
        link: "#",
    },
];

export default function Room(){
    return <>
        <AdminLayout>
            <Head>
                <title>Quản lý phòng</title>
            </Head>
            <div className={"p-5"}>
                <Flex justifyContent={"between"} className={"mb-4"}>
                    <Flex  justifyContent={"start"} className={"basis-1/2 space-x-2"}>
                        <Title>Quản lý phòng</Title>
                        <Button size={"xs"} color={"green"} icon={ArrowDownTrayIcon} tooltip={"Nhập từ excel danh sách"}></Button>
                        <Button size={"xs"} color={"yellow"} icon={ArrowUpTrayIcon} tooltip={"Xuất excel danh sách"}></Button>
                    </Flex>

                    <Flex justifyContent={"end"} className={"basis-1/2 space-x-2"}>
                        <TextInput className={"max-w-64"} placeholder={"Thông tin phòng"}></TextInput>
                        <Button>Tìm kiếm</Button>
                    </Flex>
                </Flex>

                <Card>
                    {/*<Flex justifyContent="start" className="space-x-2">*/}
                    {/*    <Title>Purchases</Title>*/}
                    {/*    <Badge color="gray">8</Badge>*/}
                    {/*</Flex>*/}
                    {/*<Text className="mt-2">Overview of this month's purchases</Text>*/}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Transaction ID</TableHeaderCell>
                                <TableHeaderCell>User</TableHeaderCell>
                                <TableHeaderCell>Item</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell className="text-right">Amount</TableHeaderCell>
                                <TableHeaderCell>Link</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((item) => (
                                <TableRow key={item.transactionID}>
                                    <TableCell>{item.transactionID}</TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>{item.item}</TableCell>
                                    <TableCell>
                                        <Badge color={colors[item.status]} size="xs">
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{item.amount}</TableCell>
                                    <TableCell>
                                        <Button size="xs" variant="secondary" color="gray">
                                            See details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    </>
}


