import { CreateUserPrams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {

    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.bimal.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: "6879f055001acffad821",
    userCollectionId: "6879f0680006058efaf2"
}

export const client = new Client()
client.setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const database = new Databases(client)
export const avatar = new Avatars(client)

export const createUser = async ({ name, email, password }: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw Error;

        await signIn({ email, password })

        const avatarUrl = avatar.getInitialsURL(name)
        return await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                name,
                email,
                accountId: newAccount.$id,
                avatar: avatarUrl
            }
        )


    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        throw new Error(errorMessage)
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        if (!session) throw Error;
        return session;
    } catch (error) {
        throw new Error(error as string)


    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw new Error("No user is currently logged in");
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)],
        )
        if (!currentUser) throw new Error("User not found in the database");
        return currentUser.documents[0];

    } catch (error) {
        console.log("Error getting current user:", error);
        throw new Error("Failed to get current user");
    }
}