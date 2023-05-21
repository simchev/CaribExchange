<script defer>
    import { io } from 'socket.io-client';
    import { onMount, afterUpdate } from 'svelte';

    let messages = [];
    let users = {};
    let messageInput;

    const socket = io();

    onMount(() => {
        messageInput = document.getElementById("message");
        const chatBox = document.getElementById("chatBox");

        socket.on('chat-users', data => {
            console.log('receiving users');
            console.log(data);
            users = data;
        });

        socket.on('chat-history', history => {
            console.log('receiving history');
            messages = history;
        });

        socket.on('chat-message', message => {
            console.log('message received');
            console.log(message);
            messages.push(message);
            messages = messages;
        });

        socket.on('user-connected', data => {
            console.log('someone connected');
            console.log(data.user);
            users[data.user.id] = data.user;
            messages.push({ notification: true, message: data.message, time: data.time })
            users = users;
            messages = messages;
        });

        socket.on('user-disconnected', data => {
            console.log('someone disconnected');
            delete users[data.user.id];
            messages.push({ notification: true, message: data.message, time: data.time })
            users = users;
            messages = messages;
        });

        socket.emit('chat-connect');
    });

    afterUpdate(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    function sendMessage(event) {
        if (messageInput?.value) {
            socket.emit('chat-message-send', messageInput.value);
            messageInput.value = "";
        }
    }

    function formatDate(date) {
        return date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +
               date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }

    function handleKeyDown(event) {
        if (event.which === 13 && !event.shiftKey) {
            if (!event.repeat) {
                const newEvent = new Event("submit", {cancelable: true});
                event.target.form.dispatchEvent(newEvent);
            }
            event.preventDefault();
        }
    }
</script>

<div class="flex flex-col justify-evenly h-[500px] w-[95%] sm:w-[600px] lg:w-[800px] xl:w-[500px] bg-gray-200 mt-5 xl:mt-0 xl:ml-10 px-3">
    <div class="h-[80%] flex justify-between">
        <div class="w-[60%] bg-gray-50 p-2 flex flex-col">
            <span class="font-medium">Chat</span>
            <div id="chatBox" class="overflow-y-auto flex-grow">
                {#each messages as m}
                    <p class="{m.notification ? 'text-blue-500' : ''}">({formatDate(new Date(m.time))}) {m.notification ? '': m.user.email.split('@')[0] + ' - '}
                        <span class="{m.notification ? 'text-blue-500' : ''}">{m.message}</span>
                    </p>
                {/each}
            </div>
        </div>
        <div class="w-[37%] bg-gray-50 p-2 flex flex-col">
            <span class="font-medium">Users</span>
            <div id="userBox" class="overflow-y-auto flex-grow">
                {#each Object.values(users) as u}
                    <p>{u.email.split('@')[0]}</p>
                {/each}
            </div>
        </div>
    </div>
    <form class="h-[12%] flex justify-between" on:submit|preventDefault={sendMessage}>
        <div class="float-left w-[60%]">
            <textarea id="message" class="w-full h-full resize-none" type="text" placeholder="Type to chat!" on:keydown={handleKeyDown} />
        </div>
        <div class="float-left w-[37%]">
            <input class="bg-brown-500 hover:bg-brown-600 w-full h-full p-2.5 cursor-pointer" type="submit" value="Send" />
        </div>
    </form>
</div>