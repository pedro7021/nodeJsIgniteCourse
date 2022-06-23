import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("should be able to send a forgot password mail to a user", async () => {
        const sendMail = spyOn(mailProviderInMemory, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "123456789",
            email: "pdddfdsf",
            name: "pdddfdsf",
            password: "pdddfdsf",
        });

        await sendForgotPasswordMailUseCase.execute("pdddfdsf");
        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send a forgot password mail to a user that does not exist", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("eafsdfsdfasdf")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );
        usersRepositoryInMemory.create({
            driver_license: "123456789",
            email: "fasdfdfsdfs",
            name: "fasdfdfsdfs",
            password: "fasdfdfsdfs",
        });
        await sendForgotPasswordMailUseCase.execute("fasdfdfsdfs");
        expect(generateTokenMail).toHaveBeenCalled();
    });
});
