import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await ConnectDB();
        const todos = await TodoModel.find({});
        return NextResponse.json({ todos: todos });
    } catch (error) {
        console.error("Database connection error:", error.message);
        return NextResponse.json({ msg: `Error connecting to the database: ${error.message}` }, { status: 500 });
    }
}

export async function POST(request) {
    const { title, description } = await request.json();
    try {
        await ConnectDB();
        await TodoModel.create({
            title,
            description
        });
        return NextResponse.json({ msg: "Todo Created" });
    } catch (error) {
        console.error("Error creating todo:", error.message);
        return NextResponse.json({ msg: `Error creating todo: ${error.message}` }, { status: 500 });
    }
}

export async function DELETE(request) {
    const mongoId = request.nextUrl.searchParams.get('mongoId');
    try {
        await ConnectDB();
        await TodoModel.findByIdAndDelete(mongoId);
        return NextResponse.json({ msg: "Todo Deleted" });
    } catch (error) {
        console.error("Error deleting todo:", error.message);
        return NextResponse.json({ msg: `Error deleting todo: ${error.message}` }, { status: 500 });
    }
}

export async function PUT(request) {
    const mongoId = request.nextUrl.searchParams.get('mongoId');
    try {
        await ConnectDB();
        await TodoModel.findByIdAndUpdate(mongoId, {
            $set: {
                isCompleted: true
            }
        });
        return NextResponse.json({ msg: "Todo Updated" });
    } catch (error) {
        console.error("Error updating todo:", error.message);
        return NextResponse.json({ msg: `Error updating todo: ${error.message}` }, { status: 500 });
    }
}
