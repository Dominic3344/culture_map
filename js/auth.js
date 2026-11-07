/*
 * Local prototype authentication for The Living Culture Map.
 * Passwords are salted and SHA-256 hashed.
 * IMPORTANT: localStorage authentication is demo-only,
 * not production security.
 */

(function () {
    'use strict';

    var USERS_KEY = 'lcm_auth_users_v1';
    var SESSION_KEY = 'lcm_auth_session_v1';
    var MODERATORS_KEY = 'lcm_authorized_moderators_v1';

    var config = window.LCM_AUTH_CONFIG || {};

    function read(key, fallback) {
        try {
            var value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    function write(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function users() {
        return read(USERS_KEY, {});
    }

    function moderators() {
        return read(MODERATORS_KEY, []);
    }

    function normalize(email) {
        return String(email || '').trim().toLowerCase();
    }

    function randomSalt() {
        var bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);

        return Array.prototype.map.call(bytes, function (b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    }

    async function hash(salt, password) {
        if (!window.crypto || !crypto.subtle) {
            throw new Error(
                'Secure password hashing is unavailable. Open this website using localhost or HTTPS.'
            );
        }

        var bytes = new TextEncoder().encode(salt + ':' + password);

        var digest = await crypto.subtle.digest('SHA-256', bytes);

        return Array.prototype.map.call(
            new Uint8Array(digest),
            function (b) {
                return b.toString(16).padStart(2, '0');
            }
        ).join('');
    }

    function roleFor(email) {
        if (
            normalize(config.adminEmail) &&
            email === normalize(config.adminEmail)
        ) {
            return 'admin';
        }

        if (moderators().indexOf(email) !== -1) {
            return 'moderator';
        }

        return 'user';
    }

    function publicUser(record) {
        return record
            ? {
                email: record.email,
                name: record.name,
                role: record.role
            }
            : null;
    }

    function getCurrentUser() {
        var email = normalize(read(SESSION_KEY, ''));

        var record = users()[email];

        if (!record) {
            return null;
        }

        var expectedRole = roleFor(email);

        if (record.role !== expectedRole) {
            record.role = expectedRole;

            var all = users();
            all[email] = record;

            write(USERS_KEY, all);
        }

        return publicUser(record);
    }

    async function register(name, email, password) {
        name = String(name || '').trim();
        email = normalize(email);

        if (name.length < 2) {
            throw new Error('Please enter your full name.');
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw new Error('Enter a valid email address.');
        }

        if (String(password || '').length < 8) {
            throw new Error('Use a password with at least 8 characters.');
        }

        var all = users();

        if (all[email]) {
            throw new Error(
                'An account with this email already exists. Please log in.'
            );
        }

        var salt = randomSalt();

        all[email] = {
            email: email,
            name: name,
            role: roleFor(email),
            salt: salt,
            passwordHash: await hash(salt, password),
            createdAt: new Date().toISOString()
        };

        write(USERS_KEY, all);
        write(SESSION_KEY, email);

        return publicUser(all[email]);
    }

    async function login(email, password, requiredRole) {
        email = normalize(email);

        var record = users()[email];

        if (
            !record ||
            await hash(record.salt, String(password || '')) !== record.passwordHash
        ) {
            throw new Error('Incorrect email or password.');
        }

        var role = roleFor(email);

        record.role = role;

        if (
            requiredRole === 'moderator' &&
            role !== 'moderator' &&
            role !== 'admin'
        ) {
            throw new Error(
                'This email is not authorized for the Moderator Hub. Ask the administrator to authorize it.'
            );
        }

        var all = users();

        all[email] = record;

        write(USERS_KEY, all);
        write(SESSION_KEY, email);

        return publicUser(record);
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
    }

    function isModerator(user) {
        return !!user &&
            (user.role === 'moderator' || user.role === 'admin');
    }

    function isAdmin(user) {
        return !!user && user.role === 'admin';
    }

    function authorizeModerator(email, actor) {
        if (!isAdmin(actor)) {
            throw new Error(
                'Only the administrator can authorize moderators.'
            );
        }

        email = normalize(email);

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw new Error('Enter a valid email address.');
        }

        if (email === normalize(config.adminEmail)) {
            throw new Error(
                'The administrator already has moderator permissions.'
            );
        }

        var list = moderators();

        if (list.indexOf(email) === -1) {
            list.push(email);
        }

        write(MODERATORS_KEY, list);

        var all = users();

        if (all[email]) {
            all[email].role = 'moderator';
            write(USERS_KEY, all);
        }

        return email;
    }

    window.LCMAuth = {
        getCurrentUser: getCurrentUser,
        register: register,
        login: login,
        logout: logout,
        isModerator: isModerator,
        isAdmin: isAdmin,
        authorizeModerator: authorizeModerator
    };

})();