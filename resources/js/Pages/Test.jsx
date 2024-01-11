import React from "react";
import {Button, Card, Text, TextInput} from "@tremor/react";
import { Divider } from "@tremor/react";

export default function Test({ auth }){
    return <>
        <div className={"max-w-screen-xl mx-auto mt-4"}>
            <form>
                <Button>Tạo phòng mới</Button>
            </form>
            <Divider>Danh sách phòng</Divider>
            <Card>
                <Text>Phòng 1</Text>
            </Card>
        </div>
    </>
}
