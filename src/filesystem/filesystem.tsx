export interface File {
    name: string;
    content: string;
}

export interface Directory {
    name: string;
    files: File[];
    directories: Directory[];
}

export const fileSystem: Directory = {
    name: "root",

    files: [],

    directories: [
        {
            name: "Desktop",
            files: [],
            directories: []
        },

        {
            name: "Documents",
            files: [
                { name: "Test", content: "This is Test." },
                { name: "Test2", content: "This is Test2." },
                { name: "Test3", content: "This is Test3." },
                { name: "QuestionableStuff.txt", content: "U chud lol"}
            ],
            directories: []
        },

        {
            name: "Downloads",
            files: [
                { name: "Test4", content: "This is Test4." },
                { name: "Test5", content: "This is Test5." },
                { name: "Test6", content: "This is Test6." }
            ],
            directories: []
        },

        {
            name: "Pictures",
            files: [
                { name: "Test7", content: "This is Test7." },
                { name: "Test8", content: "This is Test8." },
                { name: "Test9", content: "This is Test9." }
            ],
            directories: []
        }
    ]
};